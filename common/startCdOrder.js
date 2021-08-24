import { getOrderInfoById } from "@/API/svt";
import { isNull } from "@/common/filter";
export default {
    data() {
        return {
            check: {
                state: -1, //-1 未检测 0 检测指令中  1:获取新的设备参数中 2：获取完成
                times: 0,
                ret: "",
                orderId: "检测指令中",
            },
            end:false,
            page:'checkUp',//type
        }
    },
    methods: {
        /**
         * 分辨页面
         * @param {} val 
         */
        setpage(val){
            this.page=val
        },
        /**
         * 退出循环
         */
        endCd(){
            this.end=true
        },
        startCd(orderId) {
            this.check = {
                state: 0, //-1 未检测 0 检测中 1 检测完成
                times: 0,
                ret: "指令检测中",
                orderId: orderId + "",
            };
            //开始检测
            setTimeout(() => {
                this.checkState(orderId);
            }, 1500);
        },
        checkState(orderId) {
            if(this.end)return
            if (this.check.times > 60) {
                this.check.state = 2;
                this.check.ret = "检测超时";
                return;
            }
            if (this.check.state == 0) {
                this.check.times++;
                //检测指令下发状态
                this.checkOrder(orderId);
            } else if (this.check.state == 1) {
                //检测修改状态
                this.checkOrder(orderId);
            }
        },
        /**
         * 检查指令是否下发成功
         */
        checkOrder(orderId) {
            if(this.end)return
            getOrderInfoById({ orderId }).then((res) => {
                if (res.errorCode == 200) {
                    console.log(res.data.sendResult,'res.data.sendResult')
                    if (isNull(res.data)) {
                        //有可能指令还没有入库， 把它当成发送中来处理
                        this.check.state = 0;
                        this.check.ret = "指令发送中";
                    } else {
                        if (res.data.sendResult == 2) {
                            ////0:等待发送;1:发送成功;2:发送失败;
                            uni.showModal({
                                title: "提示",
                                content: "检测到指令发送失败",
                            });
                            this.check.state = 1;
                            this.check.ret = "指令发送失败";
                        } else if (res.data.sendResult == 1) {
                            if(this.page=='checkUp'){
                                this.check.state = 1;
                                this.check.ret = "指令已发送";
                                setTimeout(() => {
                                    this.checkState(orderId);
                                }, 2000);
                            }
                            if(this.page=='type'){
                                let count=5
                                const timer= setInterval(()=>{
                                    this.check.ret = `指令已发送,${count}秒后自动刷新`;
                                    count--
                                    if(count==0){
                                        clearInterval(timer)
                                        this.check.state = 1;
                                        this.check.ret = '数据已刷新';
                                    }
                                  },1000)
                            }
                           

                        } else if (res.data.sendResult == 0) {
                            this.check.state = 0;
                            this.check.ret = "指令发送中";
                            setTimeout(() => {
                                this.checkState(orderId);
                            }, 2000);
                        }
                    }
                }
               
            });
        },
    },
}