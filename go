#!/bin/bash
#####################################
# 1. vi ~/.go                       #
# 2. command : go hyy               #
#####################################
p=$0
s_p="${p:0:$[${#p}-2]}"
suffix=".go"
if [ "$1" == "" ];then
    echo "    usage : go hyy"
    echo "    please input paramter ..."
    exit -1
fi
arr=""
# read user config file [.go]
function read_file() {
    if [ -f ${2} ]
    then
        while read line
        do
            m_name=`echo ${line} | cut -d ' ' -f 1`
            if [[ "${line}" == "" || "${m_name}" != "${1}" || "${m_name:0:1}" == "#" ]]
            then
                continue
            fi
            arr_len=`echo ${line} | awk '{split($0,a," "); print length(a)}'`
            if [ $[arr_len%2] == 0 ]
            then
                echo "    config [${m_name}] paramter length not valid ..."
                continue
            fi
            arr=`echo ${line} | cut -d ' ' -f 2-${arr_len}`
        done<${2}
    fi
}
read_file ${1} ${s_p}${suffix}
read_file ${1} ${HOME}/${suffix}
if [ "${arr}" == "" ]
then
    echo "    not found [$1] , please check your user config ..."
    exit -1
fi
# execute expect command
expect ${s_p}goex $arr
exit 0
