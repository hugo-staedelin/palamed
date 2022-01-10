import time

import requests
from colorama import Fore, Style, Back, init

init()
from pathlib import Path
from sys import exit
import json
import os


def header():
    print(f"""{Fore.CYAN}{Style.BRIGHT}
   ________    ____           _______________________
  / ____/ /   /  _/___  __  _/_  __/ ____/ ___/_  __/
 / /   / /    / // __ \/ / / // / / __/  \__ \ / /
/ /___/ /____/ // /_/ / /_/ // / / /___ ___/ // /
\____/_____/___/ .___/\__, //_/ /_____//____//_/
              /_/    /____/
               RESTAPI TESTER - by 647
     Type '{Back.BLUE}help{Back.RESET}' to learn how to use this tool {Style.RESET_ALL}
""")


def handleCMD(cmd: str):
    Path("./data/testfiles").mkdir(parents=True, exist_ok=True)
    Path("./data/logs").mkdir(parents=True, exist_ok=True)
    Path("./data/body").mkdir(parents=True, exist_ok=True)
    cmd = cmd.lower()
    if cmd == "help":
        print(f"""{Fore.YELLOW}
        CLIpyTEST developed in literally 30 seconds by 647.

        {Fore.CYAN}new{Fore.YELLOW}                  - Create standard testfile
        {Fore.CYAN}run [testfile id]{Fore.YELLOW}    - Run a test by its id
        {Fore.CYAN}runall{Fore.YELLOW}               - Run all tests (in alphabetical order)
        {Fore.CYAN}show{Fore.YELLOW}                 - Show saved testfiles
        {Fore.CYAN}inspect [restfile id]{Fore.YELLOW}- Inspect a specific test
        {Fore.CYAN}exit{Fore.YELLOW}                 - Exit this script
        {Fore.RESET}""")
    if cmd == "new":
        newTest()
    if cmd.split()[0] == "run":
        cmds = cmd.split()
        if runTest(cmds[1]):
            print("TEST " + cmds[1] + f"{Fore.GREEN} OK", Fore.RESET)
        else:
            print("TEST " + cmds[1] + f"{Fore.RED} FAILED", Fore.RESET)
    if cmd == "runall":
        cmds = cmd.split()
        onlyfiles = [f for f in os.listdir("./data/testfiles") if os.path.isfile(os.path.join("./data/testfiles", f))]
        if len(onlyfiles) == 0:
            print(f"{Fore.RED}No test found{Fore.RESET}")
        for file in onlyfiles:
            time.sleep(0.5)
            file = file.replace(".json", "")
            if runTest(file):
                print("TEST " + file + f"{Fore.GREEN} OK", Fore.RESET)
            else:
                print("TEST " + file + f"{Fore.RED} FAILED", Fore.RESET)


    if cmd == "show":
        print(Fore.CYAN + "[Show tests]" + Fore.RESET)
        print("- Tests are stored in ./data/testfiles")
        onlyfiles = [f for f in os.listdir("./data/testfiles") if os.path.isfile(os.path.join("./data/testfiles", f))]
        if len(onlyfiles) == 0:
            print(f"{Fore.RED}No test found{Fore.RESET}")
        for file in onlyfiles:
            print(f"--{Fore.GREEN}", file.replace(".json", ""), Fore.RESET)

    if cmd.split()[0] == "inspect":
        print(Fore.CYAN + "[Inspect test]" + Fore.RESET)
        cmds = cmd.split()
        try:
            method, url, body, statusCode, expectedBody = readTest(cmds[1])
            print(Fore.GREEN + method.upper(), url, Fore.RESET)
            print(f"Request's body:{Fore.YELLOW}\n", body, Fore.RESET)
            print(f"Expected Status Code : {Fore.GREEN}", statusCode, Fore.RESET)
            print(f"Expected Body :{Fore.YELLOW}\n", expectedBody)
            print(Fore.RESET)
        except FileNotFoundError:
            print(f"{Fore.RED}No test found{Fore.RESET}")

    if cmd == "exit":
        exit(0)


def newTest():
    print(Fore.CYAN + "[New test]" + Fore.RESET)
    url = input("- Request URL > ")
    method = input("- Request Method > ")
    body = None
    with open("./data/body/temp.txt", 'w') as outfile:
        outfile.write("Replace this text with the content of your body, erase everything to send an empty body\nDon't forget to save!")
    os.system("notepad.exe './data/body/temp.txt'")
    with open("./data/body/temp.txt", 'r') as outfile:
        body = outfile.read()
    if body == "":
        body = "{}"
    print("Choose between these tests")
    options = ["StatusCode", "StatusCodeSpecificBody"]
    for option in options:
        print("###", Fore.GREEN + option, Fore.RESET)
    valid = False
    testType = "StatusCode"
    while not valid:
        testType = input("-- Test > ")
        if testType not in options:
            print(f"{Fore.RED}Test does not exist{Fore.RESET}")
        else:
            valid = True
    statusCode = input("--- Status Code > ")
    expectedBody = None
    if testType == "StatusCodeSpecificBody":
        with open("./data/body/temp.txt", 'w') as outfile:
            outfile.write("Replace this text with the content of expected body\nDon't forget to save!")
        os.system("notepad.exe './data/body/temp.txt'")
        with open("./data/body/temp.txt", 'r') as outfile:
            expectedBody = outfile.read()
    exists = True
    label = "Default"
    while exists:
        label = input("- Test label (tests will be executed in alphabetical order) > ")
        exists = os.path.isfile('./data/testfiles' + label)
        if exists:
            print(f"{Fore.RED}A test with this label already exists{Fore.RESET}")
    data = {}
    data['content'] = []
    data['content'].append({
        'method': method,
        'url': url,
        'body': body,
        'statusCode': statusCode,
        'expectedBody': expectedBody,
    })
    with open("./data/testfiles/" + label + ".json", 'w') as outfile:
        json.dump(data, outfile)
    print(Fore.CYAN + "=== New test added ===", Fore.RESET)
    print(Fore.GREEN + method.upper(), url, Fore.RESET)
    print(f"Request's body:\n{Fore.YELLOW}", body, Fore.RESET)
    print(f"Expected Status Code : {Fore.GREEN}", statusCode, Fore.RESET)
    print(f"Expected Body :{Fore.YELLOW}\n", expectedBody)
    print(Fore.RESET)


def readTest(label):
    with open("./data/testfiles/" + label + '.json') as json_file:
        data = json.load(json_file)
        method = data['content'][0]['method']
        url = data['content'][0]['url']
        body = data['content'][0]['body']
        statusCode = data['content'][0]['statusCode']
        expectedBody = data['content'][0]['expectedBody']

    return method, url, body, statusCode, expectedBody


def runTest(storageName) -> bool:
    try:
        method, url, body, statusCode, expectedBody = readTest(storageName)
        if method.upper() == "POST":
            r = requests.post(url=url, data=json.loads(body))
        elif method.upper() == "GET":
            r = requests.get(url=url)
        elif method.upper() == "PATCH":
            r = requests.patch(url=url, data=json.loads(body))
        elif method.upper() == "PUT":
            r = requests.put(url=url, data=json.loads(body))
        elif method.upper() == "DELETE":
            r = requests.delete(url=url)
        else:
            print(f"{Fore.RED}This method is not supported{Fore.RESET}")

        if int(statusCode) == r.status_code:
            if expectedBody is not None:
                expectedBody = str(expectedBody).replace("\n", "")
                expectedBody = expectedBody.replace(" ", "")
                responseContent = r.text.replace("\n", "")
                responseContent = responseContent.replace(" ", "")
                if expectedBody == responseContent:
                    return True
                else:
                    print(f"{storageName} : {Fore.RED}Bodies do not match{Fore.RESET}")
                    print(
                        f"-- Body : Got \n{Fore.YELLOW}{responseContent}{Fore.RESET}\nand expected \n{Fore.YELLOW}{expectedBody}{Fore.RESET}")
            else:
                return True
        else:
            print(
                f"{storageName} : {Fore.RED}Status Code doesn't match{Fore.RESET}\nGot {r.status_code} but expected {statusCode}")

        return False

    except FileNotFoundError:
        print(f"{Fore.RED}This test does not exist{Fore.RESET}")
        return False


if __name__ == '__main__':
    header()
    while True:
        print(Fore.CYAN + "[Main menu]" + Fore.RESET)
        cmd = input("> ")
        handleCMD(cmd)
