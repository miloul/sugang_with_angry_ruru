import sys
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.select import Select
from selenium.common.exceptions import NoSuchElementException

_URL='http://my.knu.ac.kr/stpo/stpo/cour/listLectPln/list.action'
semester='20212'
sleeptime=0.07


shown="display: inline-block;"
unshown="display: none;"
replacing=[",","\n"]

#드라이버 설정
driver = webdriver.PhantomJS('/usr/local/bin/phantomjs') #Phantomjs 디렉토리
driver.set_window_size(1200, 1000) #사이즈 설정
driver.get(_URL)

#파일열기
f=open("output.csv", "w")


def main():
    search(0, [0, 0, 0], ['NULL', 'NULL', 'NULL'])
    f.close()



def search(depth, indexes, names):
    #print(depth)
    if depth>=3: #3개 다 찼으면 출력
        View(names, indexes)
        return
    if indexes[0]+1 > 4: # sub 05 이상은 없음
        xpath=('//*[@id="mainDiv"]', '//*[@id="sub0{}"]'.format(4), '//*[@id="sub2"]') #dropdown 각자 xpath
    else:
        xpath=('//*[@id="mainDiv"]', '//*[@id="sub0{}"]'.format(indexes[0]+1), '//*[@id="sub2"]') #dropdown 각자 xpath

    if driver.find_element_by_xpath(xpath[depth]).get_attribute("style") == unshown and depth!=0: #해당 dropdown이 없다면, 첫번째 카테고리 선정이 아닐떄 (첫번째 카테고리르 style없음)
        names[depth]='NULL'
        indexes[depth]=0
        search(depth+1, indexes, names)
        return

    selected=Select(driver.find_element_by_xpath(xpath[depth]))
    loop=len(selected.options)
    for i in range(loop):
        time.sleep(sleeptime)
        indexes[depth]=i

        setdropdowns(xpath, indexes)

        selected=Select(driver.find_element_by_xpath(xpath[depth]))
        names[depth]=selected.options[i].text

        search(depth+1, indexes, names)

    indexes[depth]=0
    names[depth]='NULL'


def setdropdowns(xpath, indexes):
    for i in range(0, 3):
        
        selected=Select(driver.find_element_by_xpath(xpath[i]))
        try:
            selected.select_by_index(indexes[i]) 
        except: # 존재하지 않을때
            pass



def View(names, indexes):
    ViewButton=driver.find_element_by_xpath('//*[@id="doSearch"]')
    ViewButton.click()

    writebuffer="******"+','
    writebuffer+="******"+','
    writebuffer+="******"+','

    i=1
    while True:
        try:
            textbox=driver.find_element_by_xpath('//*[@id="viewPlans"]/table/tbody/tr[{}]/th[{}]'.format(1,i))
            text=replaceletters(textbox.text)
            writebuffer=writebuffer+text+','
        except NoSuchElementException:
            writebuffer+='\n'
            f.write(writebuffer)
            break
        i+=1

    xlength=i-1
    i=2 #첫번째 줄은 제외 
    while True:
        try: #끝 줄 읽은 뒤인지 확인
            textbox=driver.find_element_by_xpath('//*[@id="viewPlans"]/table/tbody/tr[{}]/td[{}]'.format(i,1))
        except NoSuchElementException:
            break

        writebuffer=replaceletters(names[0])+','
        writebuffer+=replaceletters(names[1])+','
        writebuffer+=replaceletters(names[2])+','

        flag=0
        for j in range(1, xlength+1):
            try:
                textbox=driver.find_element_by_xpath('//*[@id="viewPlans"]/table/tbody/tr[{}]/td[{}]'.format(i,j))
                text=replaceletters(textbox.text)
                writebuffer=writebuffer+text+','
            except NoSuchElementException:
                flag=1
                break
        writebuffer+='\n'
        if flag==0: #조회된 자료가 없습니다 라고 뜨는 특이 케이스 있어서...
            f.write(writebuffer)
        i+=1

def replaceletters(str):
    for x in range(len(replacing)):
        str=str.replace(replacing[x], "/")
    return str
    


if __name__ == '__main__':
    main()

