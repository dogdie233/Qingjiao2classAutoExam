/// <reference path="jquery.d.ts" />

function Run(element){
    $.ajax({
        type: "GET",
        url: "https://www.2-class.com/api/exam/getTestPaperList?courseId=" + window.location.pathname.split("/")[3], // 读取地址栏的试卷id
        success: function(result){ // 成功执行
            if (result["success"]){
                console.info("load answer success!")
                element.click()  // 开始考试
                result["data"]["testPaperList"].forEach(testPaper => { // 遍历题目
                    console.log("题目: " + testPaper["title"] + " 答案: " + testPaper["answer"])
                    testPaper["answer"].split(",").forEach(answer => {  // 遍历答案(多选题)
                        $("label:eq(" + answer + ")").click()  // 获得与答案id相对应的li元素
                    })
                    $("button.ant-btn.ant-btn-primary").click() // 下一题
                });
                console.log("submitting...")
            } else {
                console.error("load answer failed!")
                console.error(result)
            }
        },
        error: function(error){  // 失败执行
            console.error(error)
        }
    })
}

// 等待元素获取成功
// element: string 元素的字符串
// callback: 当元素获取成功时的回调
function WaitElement(element, callback){
    if ($(element).length <= 0) setTimeout(function(){ WaitElement(element, callback)}, 50); else callback($(element));
}

console.log("qwq");
WaitElement("button", Run)  // 等待开始考试按钮
