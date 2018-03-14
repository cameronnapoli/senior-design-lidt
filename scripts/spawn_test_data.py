# Spawn test data script
#
# Written by Cameron Napoli
# Load SQL DB with random data

import MySQLdb as mdb
import sys, getopt, os
import random
from datetime import datetime, timedelta
import json


deviceId = None
batch_size = 10 # default 10
time_fmt = "%Y-%m-%d %H:%M:%S"


def set_env_vars_debug():
    os.environ["MYSQL_SERVER"] = "127.0.0.1"
    os.environ["MYSQL_USER"] = "root"
    os.environ["MYSQL_PASS"] = ""
    os.environ["MYSQL_DB"] = "lidt"


def set_env_vars_prod():
    """ Set environment variables from json config file """
    dat = {}
    fname = "prod.json"

    try:
        with open(fname) as f:
            dat = json.load(f)

        os.environ["MYSQL_SERVER"] = dat["MYSQL_SERVER"]
        os.environ["MYSQL_USER"] = dat["MYSQL_USER"]
        os.environ["MYSQL_PASS"] = dat["MYSQL_PASS"]
        os.environ["MYSQL_DB"] = dat["MYSQL_DB"]

    except IOError as e:
        exit("ERROR: need production config file named \"%s\"" % fname)
    except ValueError as e:
        exit("ERROR: JSON in \"%s\" not parseable" % fname)
    except KeyError as e:
        exit("ERROR (json file missing correct keys): %s" % e)


def insert_batch_on_range(size, start, end):
    """
    deviceId : ID of device to insert data points on
    size     : number of data points to insert
    start    : datetime of start
    end      : datetime of end
    """

    if end < start:
        raise Exception("end datetime is before start datetime in insert_batch_on_range()")

    rplc_str = "(%s, \"%s\", \"%s\")"

    sql = """
    INSERT INTO DeviceEvents (DeviceID, CreatedDate, EventType) VALUES
    """

    for i in range(size):
        # calculate a random timedelta within the bounds 0 - (end-start)
        seconds_diff = (end-start).total_seconds()
        rand_seconds = random.uniform(0, seconds_diff)
        td = timedelta(seconds=rand_seconds)

        # add timedelta to start
        event_time_str = datetime.strftime(start + td, time_fmt)

        # (50% chance of 'entry' or 'exit')
        event_type = random.choice(["entry", "exit"])

        # insert insert row to query string
        params = (deviceId, event_time_str, event_type)
        sql += rplc_str % params

        if i < size - 1:
            sql += ",\n"

    sql_insert(sql)


def fetch_credentials():
    """ Get SQL credentials from environment variables """
    return (os.environ["MYSQL_SERVER"],
            os.environ["MYSQL_USER"],
            os.environ["MYSQL_PASS"],
            os.environ["MYSQL_DB"])


def sql_insert(sql_str, params=None):
    """ Helper function to run SQL SELECT query """
    creds = fetch_credentials()
    conn = None
    try:
        conn = mdb.connect(*creds) # unpack creds into params
        cursor = conn.cursor()
        if params:
            cursor.execute(sql_str, params)
        else:
            cursor.execute(sql_str)
        conn.commit()
    except mdb.Error, e:
        err_str = "SQL INSERT Error %d: %s" % (e.args[0],e.args[1])
        print(err_str)
        raise Exception(err_str)
    finally:
        if conn:
            conn.close()


def main():
    # default just load pseudo random data for 2018
    start = datetime.strptime("2018-01-01 00:00:00", time_fmt)
    end   = datetime.strptime("2018-12-31 23:59:59", time_fmt)

    if (batch_size > 0):
        insert_batch_on_range(batch_size, start, end)


if __name__ == "__main__":
    crctusage = (
        "\nUsage: python " + __file__ + " (-p) -i <deviceId> -b <batchsize>\n" +
        "Help:\n\tThis script batch inserts data for testing in\n" +
        "\teither the production or the testing database.\n" +
        "Options:\n\t-p\t\t" + "production : point to production or not\n" +
        "\t-i\t\t" + "deviceId   : device of id to insert events for\n" +
        "\t-b\t\t" + "batchsize  : number of events to insert\n" )

    argv = sys.argv[1:]
    if len(argv) == 0:
        print(crctusage)
        sys.exit(1)

    set_env_vars_debug()
    try:
        opts, args = getopt.getopt(argv, "pi:b:")
    except getopt.GetoptError:
        print(crctusage)
        sys.exit(1)
    for opt, arg in opts:
        if opt == '-p': # use production
             set_env_vars_prod()
        elif opt == '-i':
            deviceId = int(arg)
        elif opt == '-b':
            batch_size = int(arg)

    main()
