<template>
  <view class="addwarkpage">
    <uni-forms :value="formData" ref="addForm" :rules="rules">
      <uni-forms-item label="日期" name="productionTime">
        <!-- <uni-easyinput
          type="text"
          v-model="formData.productionTime"
          placeholder="请选择日期"
        /> -->
        <uni-datetime-picker
          class="warkpageInp"
          v-model="dateStart"
          type="date"
          :value="date"
          disabled="true"
          start="2020-6-15"
          end="2025-6-15"
          @change="StartdateChange"
        ></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item label="物料名称" name="productId">
        <picker
          class="item-picker"
          mode="multiSelector"
          range-key="name"
          @change="classifyChange"
          @columnchange="columnchange"
          :value="classifyIndex"
          :range="classifyArr"
        >
          <view>{{ name }}</view>
        </picker>

        <!--
<picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" @change="pickerbindChange"  :value="value" >
    <picker-view-column>
      <view v-for="item in dataList" :key='item.id' style="line-height: 50px">{{item.productTypeName}}</view>
    </picker-view-column>
    <picker-view-column>
      <view v-for="item1 in dataList1" :key='item1.id' style="line-height: 50px">{{item1.productTypeName}}</view>
    </picker-view-column>
    <picker-view-column>
      <view v-for="item2 in dataList2" :key='item2.id' style="line-height: 50px">{{item2.productTypeName}}</view>
    </picker-view-column>

  </picker-view> -->
      </uni-forms-item>
      <uni-forms-item label="产品名称" name="productNameId">
        <picker
          mode="selector"
          :range="schoolList"
          :range-key="'school_name'"
          class="item-picker"
          @change="schoolChange"
        >
          {{ before_school ? before_school : "请选择产品名称" }}
        </picker>
      </uni-forms-item>
      <uni-forms-item label="线别" name="line">
        <uni-easyinput
          type="text"
          v-model="formData.line"
          placeholder="请输入线别"
        />
      </uni-forms-item>
      <uni-forms-item label="计划数" name="annualTarget">
        <uni-easyinput
          type="number"
          v-model="formData.annualTarget"
          placeholder="请输入计划数"
        />
      </uni-forms-item>
      <uni-forms-item label="送检数" name="sendTheNumber">
        <uni-easyinput
          type="number"
          v-model="formData.sendTheNumber"
          placeholder="请输入送检数"
        />
      </uni-forms-item>
      <uni-forms-item label="完成数" name="completeTheNumber">
        <uni-easyinput
          type="number"
          v-model="formData.completeTheNumber"
          placeholder="请输入完成数"
        />
      </uni-forms-item>
      <uni-forms-item label="不良数" name="numberOdefectives">
        <uni-easyinput
          type="number"
          v-model="formData.numberOdefectives"
          placeholder="请输入不良数"
        />
      </uni-forms-item>
      <uni-forms-item label="未完成原因" name="unfinished">
        <uni-easyinput
          type="text"
          v-model="formData.unfinished"
          placeholder="请输入未完成原因"
        />
      </uni-forms-item>
      <uni-forms-item label="备注" name="remark">
        <uni-easyinput
          type="text"
          v-model="formData.remark"
          placeholder="请输入备注"
        />
      </uni-forms-item>
      <button @click="submitForm" type="primary" :loading="sureloading">
        确定
      </button>
    </uni-forms>
  </view>
</template>

<script>
import {
  getSysProductionTypeTree,
  getSysProductionName,
} from "../../API/workDaily";

export default {
  data() {
    return {
      // dataList:[],
      // dataList1:[],
      // dataList2:[],
      // value:[0,0,0],
      sureloading: false,
      dateStart:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      message: "",
      alertType: "",
      alldata: [],
      formData: {
        annualTarget: null,
        completeTheNumber: null,
        sendTheNumber: null,
        numberOdefectives: null,
        line: "",
        unfinished: "",
        remark: "",
        productionTime: "",
        productNameId: "",
        productId: "",
      },
      // value: "",
      loading: false,
      dataSource: [],
      name: "请选择物料名称",
      classifyArr: [[], [], []], // picker - 数据源
      classifyIndex: [0, 0, 0], // picker - 索引
      childArr: [], // 二级分类数据源
      thirdChildArr: [], // 三级分类数据源

      // 在picker列表所选中项的befor_school
      before_school: "",
      // 在picker列表所选中项的id
      sid: "",
      schoolList: [],
      everyIndex: [0, 0, 0],

      rules: {
        // 对productionTime字段进行必填验证
        line: {
          rules: [
            {
              required: true,
              errorMessage: "请输入日期",
            },
          ],
        }, // 对productId字段进行必填验证
        productId: {
          rules: [
            {
              required: true,
              errorMessage: "请输入物料名称",
            },
          ],
        }, // 对productNameId字段进行必填验证
        productNameId: {
          rules: [
            {
              required: true,
              errorMessage: "请输入产品名称",
            },
          ],
        },
        // 对line字段进行必填验证
        line: {
          rules: [
            {
              required: true,
              errorMessage: "请输入线别",
            },
          ],
        },
        // 对email字段进行必填验证
        annualTarget: {
          rules: [
            {
              required: true,
              errorMessage: "请输入计划数",
            },
          ],
        },
      },
    };
  },
  computed: {},
  onLoad(options) {
    // 获取数据源并分出一级二级分类
    getSysProductionTypeTree().then((res) => {
      if (res.data.flag) {
        res.data.data.map((item, i) => {
          this.dataSource.push({
            id: item.id,
            name: item.productTypeName,
            child: [],
          });
          if (item.children != null) {
            item.children.map((item1, j) => {
              this.dataSource[i].child.push({
                id: item1.id,
                name: item1.productTypeName,
                child: [],
              });

              if (item1.children != null) {
                item1.children.map((item2) => {
                  this.dataSource[i].child[j].child.push({
                    id: item2.id,
                    name: item2.productTypeName,
                    child: [],
                  });
                });
              }
            });
          }
        });
        this.getAllClassify(this.dataSource);
      } else {
        this.dataSource = [];
      }
    });
  },
  onShow() {},

  methods: {
    // pickerbindChange(e){
    //   this.value=e.detail.value
    //   this.dataList1=this.dataList[this.value[0]].children
    //   this.dataList2=this.dataList1[0].children
    //   console.log("this.value[0]",this.value,"dataList",this.dataList,'this.dataList1',this.dataList1,'this.dataList2',this.dataList2)
    // },

    schoolChange(e) {
      const index = e.target.value;
      this.before_school = this.schoolList[index].school_name;
      // 根据业务需求 判断你是否需要数组中的其他数据 一般都是会需要id的  嘿嘿
      this.formData.productNameId = this.schoolList[index].id;
    },

    // 获取数据源并分出一级二级
    getAllClassify(val) {
      let first = {
        child: [],
        id: "",
        name: "空",
      };
      let dataLen = val.length;

      for (let i = 0; i < dataLen; i++) {
        // 将数据源中的二级分类 push 进 childArr，作为二级分类的数据源
        this.childArr.push(val[i].child);
        this.childArr[i].unshift(first);
        this.thirdChildArr.push([]);
        for (let j = 0; j < val[i].child.length; j++) {
          this.thirdChildArr[i].push(val[i].child[j].child);
          if (j > 0) {
            this.thirdChildArr[i][j].unshift(first);
          }
        }
      }
      // 一级分类的数据源
      this.classifyArr[0] = val;

      // 第一次打开时，默认给一级分类添加它的二级分类
      this.classifyArr[1] = this.childArr[0];
      this.classifyArr[2] = this.thirdChildArr[0][0];
    },
    submitForm() {
      this.$refs.addForm
        .submit()
        .then((res) => {
          this.sureloading = true;
          let year = new Date().getFullYear();
          let Month = new Date().getMonth() + 1;
          let day = new Date().getDate();

          Month < 10 ? (Month = "0" + Month) : (Month = Month);
          day < 10 ? (day = "0" + day) : (day = day);
          this.formData.productionTime =
            year + "-" + Month + "-" + day + "T16:00:00.000Z";
          let addParmas = {
            annualTarget: Number(this.formData.annualTarget),
            completeTheNumber: Number(this.formData.completeTheNumber),
            sendTheNumber: Number(this.formData.sendTheNumber),
            numberOdefectives: Number(this.formData.numberOdefectives),
            line: this.formData.line,
            unfinished: this.formData.unfinished,
            remark: this.formData.remark,
            productionTime: this.formData.productionTime,
            productNameId: this.formData.productNameId,
          };
          uni.request({
            url:
              "https://oa.cvnavi.com/api/oareport/weekdayreport/saveSysWeekdayReport",
            method: "POST",
            header: {
              // "content-type": "application/x-www-form-urlencoded",
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: "Bearer " + uni.getStorageSync("token"),
            },

            data: addParmas,
            success: (res) => {
              this.sureloading = false;
              uni.showToast({
                title: "添加成功",
                icon: "success", //将值设置为 success 或者 ''
                duration: 2500, //持续时间为 2秒
              });
              uni.navigateTo({
                url: "/pages/workDaily/workDaily",
              });
            },
            fail: (res) => {
              this.sureloading = false;
              uni.showToast({
                title: "添加失败",
                icon: "warn", //将值设置为 success 或者 ''
                duration: 2500, //持续时间为 2秒
              });
              uni.navigateTo({
                url: "/pages/workDaily/workDaily",
              });
            },
          });
        })
        .catch((err) => {});
    },
    // 选择商品分类
    classifyChange(e) {
      let value = e.target.value;
      this.classifyIndex = value;
      let listName1 =
        this.classifyArr[0].length != 0
          ? this.classifyArr[0][this.classifyIndex[0]].name
          : "";
      let listName2 =
        this.classifyArr[1].length != 0
          ? this.classifyArr[1][this.classifyIndex[1]].name
          : "";
      let listName3 =
        this.classifyArr[2].length != 0
          ? this.classifyArr[2][this.classifyIndex[2]].name
          : "";
      if (this.classifyArr[2].length != 0) {
        if (this.classifyIndex[2] != 0) {
          this.formData.productId = this.classifyArr[2][
            this.classifyIndex[2]
          ].id;
          this.name = listName1 + "/" + listName2 + "/" + listName3;
        } else {
          this.formData.productId = this.classifyArr[1][
            this.classifyIndex[1]
          ].id;
          this.name = listName1 + "/" + listName2;
        }
        //
      } else {
        if (this.classifyArr[1].length != 0) {
          if (this.classifyIndex[1] != 0) {
            this.formData.productId = this.classifyArr[1][
              this.classifyIndex[1]
            ].id;
            this.name = listName1 + "/" + listName2;
          } else {
            this.formData.productId = this.classifyArr[0][
              this.classifyIndex[0]
            ].id;
            this.name = listName1;
          }
        } else {
          if (this.classifyArr[0].length != 0) {
            if (this.classifyIndex[1] != 0) {
              this.formData.productId = this.classifyArr[0][
                this.classifyIndex[0]
              ].id;
              this.name = listName1;
            }
          }
        }
      }
      this.findProName(this.formData.productId);
    },
    findProName(val) {
      getSysProductionName({ id: val }).then((res) => {
        if (res.data.flag && res.data.errorCode == "200") {
          if (res.data.data.length > 0) {
            var aer = [];
            res.data.data.map((item) => {
              aer.push({
                id: item.id,
                school_name: item.productPartNumbet + "/" + item.productName,
              });
            });
            this.schoolList = aer;
          } else {
            this.schoolList = [];
          }
        }
      });
    },
    // 获取二级分类
    columnchange(e) {
      this.everyIndex[e.detail.column] = e.detail.value;
      var changeIndex = [0, 0, 0]; // picker - 索引
      changeIndex[e.detail.column] = e.detail.value;

      // 当滚动切换一级分类时，为当前的一级分类添加它的子类
      if (e.detail.column == 0) {
        this.classifyIndex = [e.detail.value, 0, 0];
        this.classifyArr[1] = this.childArr[this.everyIndex[0]];
        // this.classifyArr[2] = this.thirdChildArr[changeIndex[0]][0];
        this.classifyArr[2] = this.thirdChildArr[this.everyIndex[0]][0];
        this.$set(this.classifyArr, 1, this.childArr[this.everyIndex[0]]);
        // this.$set(this.classifyArr, 2, this.thirdChildArr[changeIndex[0]][0]);
        this.$set(
          this.classifyArr,
          2,
          this.thirdChildArr[this.everyIndex[0]][0]
        );
      }
      if (e.detail.column == 1) {
        this.classifyIndex = [this.everyIndex[0], e.detail.value, 0];
        this.classifyArr[1] = this.childArr[this.everyIndex[0]];
        this.classifyArr[2] = this.thirdChildArr[this.everyIndex[0]][
          this.everyIndex[1]
        ];
        this.$set(this.classifyArr, 1, this.childArr[this.everyIndex[0]]);
        this.$set(
          this.classifyArr,
          2,
          this.thirdChildArr[this.everyIndex[0]][this.everyIndex[1]]
        );
      }

      if (e.detail.column == 2) {
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.addwarkpage {
  width: 100%;
  .popupBox {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    background: #fff;
  }
  .popupBoxItem {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .item-picker {
    margin-top: 10px;
  }
  .popupBoxInput {
    width: 80%;
  }
}
</style>