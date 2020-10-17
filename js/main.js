/// <reference path="jquery.d.ts" />


console.info("hiiii")


function Run(){
    $.ajax({
        type: "GET",
        url: "https://m.2-class.com/api/exam/getTestPaperList?courseId=" + window.location.pathname.split("/")[2],
        success: function(result){
            if (result["success"]){
                console.info("load answer success!")
                $(".index-module__begining--22gVw").click()  // 开始考试
                result["data"]["testPaperList"].forEach(testPaper => { // 遍历题目
                    testPaper["answer"].split(",").forEach(answer => {  // 遍历答案(多选题)
                        $(".index-module__box--2hd3a").children("li:eq(" + answer + ")").click()
                    })
                    $(".index-module__next--3bbsu").click() // 下一题
                });
            } else {
                console.error("load answer failed!")
                console.error(result)
            }
        },
        error: function(error){
            console.error(error)
        }
    })
}

function WaitElement(element, callback){
    if ($(element).length <= 0) setTimeout(function(){ WaitElement(element, callback)}, 50); else callback();
}

WaitElement(".index-module__begining--22gVw", Run)
