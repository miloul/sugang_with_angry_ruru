# -*- coding: utf-8 -*-
from jamo import h2j, j2hcj 
import sys
import json

firstCat=sys.argv[1]
secondCat=sys.argv[2]
thirdCat=sys.argv[3]
year=sys.argv[4]
searchstring=sys.argv[5]

 


READ=open('scraping/output.csv', "r", encoding='UTF-8')

#******,******,******,학년,교과/구분,(개설대학),교과목/번호,교과목명,학점,강의,실습,담당/교수,
#강의시간,강의시간/(실제시간),강의실,수강/정원,수강/신청,수강꾸러미/신청,수강꾸러미/신청가능여부,비고,강의방식,

#first : 0, second : 1, third : 2, 학년 : 3, 교과구분 : 4, 개설대학 : 5, 교과목번호 : 6, 교과목명 : 7, 학점 : 8, 강의 : 9, 실습 : 10, 담당교수 : 11
#강의시간 : 12, 강의시간(실제시간) : 13, 강의실 : 14, 수강정원 : 15, 수강신청 : 16, 수강꾸러미신청 : 17, 수강꾸러미신청가능여부 : 18, 비고 : 19, 강의방식 : 20

Category=['first', 'second', 'third', '학년', '교과구분', '개설대학', '과목번호', '교과목명', '학점', '강의', '실습', '교수', '강의시간', '실제시간', '강의실', '수강정원', '수강신청', '수꾸신청', '수꾸신청가능여부', '비고', '강의방식']


def seperated(string):
    return j2hcj(h2j(string))

##카테고리: first cat, second cat, third cat / 검색: 교수이름, 과목이름, 과목코드, 대학이름, 과이름
def fromCategory(DatafromLine, firstCat, secondCat, thirdCat, year):
    if DatafromLine[0] == firstCat or firstCat == 'NULL':
        if DatafromLine[1] == secondCat or secondCat == 'NULL':
            if DatafromLine[2] == thirdCat or thirdCat == 'NULL':
                if DatafromLine[3] == year or year == 'NULL': 
                    return True
    return False

def fromSearch(DatafromLine, searchstring):
    flag=False
    List=[11, 6, 7, 1, 2]#검색 허용하는 카테고리
    if (searchstring == ''):
        flag=True
    for cat in List:
        if seperated(searchstring) in seperated(DatafromLine[cat]):
            flag=True
            if (cat==1 or cat==2) and DatafromLine[cat]=='NULL':
                flag=False

    return flag

def injson(DatafromLine):
    dataform={}
    for num in range(len(Category)):
        dataform[Category[num]]=DatafromLine[num]
    return dataform


lines=READ.readlines()
flag=False #개설대학 카테고리 있나 없나

for line in lines:
    if line[0:3]=="***" and "개설대학" in line:
        flag=True
    elif line[0:3]=="***" and "개설대학" not in line:
        flag=False
    else: # 카테고리 나타내는 줄이 아닐 경우에
        word=""
        index=0
        DatafromLine=[]
        for letter in line:
            if letter==',':
                DatafromLine.append(word) 

                word=''
                index+=1
                if flag==False and index==5: #개설대학
                    DatafromLine.append('')
                    index+=1
            else:
                word+=letter

        if fromCategory(DatafromLine, firstCat, secondCat, thirdCat, year):
            if fromSearch(DatafromLine, searchstring):
                print(injson(DatafromLine))

