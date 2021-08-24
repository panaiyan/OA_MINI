/**
 * 过滤数值
 * @param {*} val 
 * @param {*} fix 
 * @returns 
 */
function toFloat(val,fix){
    if(null==val || undefined == val || ''==val || isNaN(val)){
      return 0;
    }
    
    var f = parseFloat(val);
    if(f%1 == 0){//整数
      return f;
    }else{
      return f.toFixed(fix);
    }
  }

export const isNull=function (obj){
    if(undefined == obj || null == obj || '' === obj || 'null' == obj || 'undefined' == obj) return true;
    return false;
  }
  
 //十进制数据转二进制 反转
 function num2str(data,num){
    if(isNull(data) || isNaN(data)) data = 0;//先给个默认
    var data2Str  = parseInt(data).toString(2);
    //console.log('二进制字符串：'+data2Str);
    var data2SArr = data2Str.split('');
    data2SArr = data2SArr.reverse();//反转
    //console.log('反转结果：'+data2SArr);
    var len = data2SArr.length;
    for(var i=0;i<(num-len);i++){//补全num位数
      data2SArr.push(0);
    }
    //console.log('补全后的数据：'+data2SArr);
    return data2SArr;
 }
/**
 * 设置数据
 * @param {*} state 
 * @returns 
 */
  export const  parseState=function(state){
    if(state == null || Object.keys(state).length == 0) return null;
    //解析温度 0xFFFF表示未接温度传感器 偏移值 -32767，精度1/100度，表示范围-327.67-327.68度
    if(!isNull(state.Temperature1)){
      if(isNaN(state.Temperature1)){
        state.Temperature1_p = '无效数据'+state.Temperature1;
      }else if(state.Temperature1 == '65535'){
        state.Temperature1_p = '未接入温度传感器';
      }else{
        state.Temperature1_p = (parseInt(state.Temperature1)-32767.0)/10 + "℃";
      }
    }
    if(!isNull(state.Temperature2)){
      if(isNaN(state.Temperature2)){
        state.Temperature2_p = '无效数据'+state.Temperature2;
      }else if(state.Temperature1 == '65535'){
        state.Temperature2_p = '未接入温度传感器';
      }else{
        state.Temperature2_p = (parseInt(state.Temperature1)-32767.0)/10 + "℃";
      }
    }

    //解析状态标志 十进制转2进制，每一位代表一个开关
    /**
     * 0	ACC
      1	CAN0状态
      2	CAN1状态
      3	疲劳识别设备状态
      4	摄像头1状态
      5	摄像头2状态
      6	摄像头3状态
      7	摄像头4状态
      8	IO0
      9	IO1
      10	IO2
      11	IO3
      12	IO4
      13	IO5
      14	IO6
      15	IO7
     */
    //console.log('开始解析状态标志');
    var stateFlag2SArr = num2str(state.StateFlag,16);
    var stateFlagArr = [];
    for(var i=0;i<stateFlag2SArr.length;i++){
      stateFlagArr.push(stateFlag2SArr[i]);
    }
    state.stateFlagArr = stateFlagArr;

    //解析平台连接状态 ConnectedState字段
    /**
     * 0-3	平台1连接状态	
      0 默认
      1 鉴权成功
      2 注册成功
      3 注册失败-车辆已被注册
      4 注册失败-数据库中无该车辆
      5 注册失败-终端已被注册
      6 注册失败-数据库中无该终端
      7 鉴权失败
      4-7	平台2连接状态	
      0 默认
      1 鉴权成功
      2 注册成功
      3 注册失败-车辆已被注册
      4 注册失败-数据库中无该车辆
      5 注册失败-终端已被注册
      6 注册失败-数据库中无该终端
      7 鉴权失败
     */
    //console.log('开始解析平台链接状态');
    var connectedState2SArr = num2str(state.ConnectedState,8);
    var server1_2str  = connectedState2SArr[3]+""+connectedState2SArr[2]+connectedState2SArr[1]+connectedState2SArr[0];
    var server1_10str =parseInt(server1_2str,2);//转成10进制
    var server2_2str  = connectedState2SArr[7]+""+connectedState2SArr[6]+connectedState2SArr[5]+connectedState2SArr[4];
    var server2_10str =parseInt(server2_2str,2);//转成10进制
    var connectedStateserver1 = '未知';
    if(server1_10str==0) connectedStateserver1 = '默认'
    if(server1_10str==1) connectedStateserver1 = '鉴权成功'
    if(server1_10str==2) connectedStateserver1 = '注册成功'
    if(server1_10str==3) connectedStateserver1 = '车辆已被注册'
    if(server1_10str==4) connectedStateserver1 = '数据库中无该车辆'
    if(server1_10str==5) connectedStateserver1 = '终端已被注册'
    if(server1_10str==6) connectedStateserver1 = '数据库中无该终端'
    if(server1_10str==7) connectedStateserver1 = '鉴权失败'

    var connectedStateserver2 = '未知';
    if(server2_10str==0) connectedStateserver2 = '默认'
    if(server2_10str==1) connectedStateserver2 = '鉴权成功'
    if(server2_10str==2) connectedStateserver2 = '注册成功'
    if(server2_10str==3) connectedStateserver2 = '车辆已被注册'
    if(server2_10str==4) connectedStateserver2 = '数据库中无该车辆'
    if(server2_10str==5) connectedStateserver2 = '终端已被注册'
    if(server2_10str==6) connectedStateserver2 = '数据库中无该终端'
    if(server2_10str==7) connectedStateserver2 = '鉴权失败'
    state.connectedStateserver1 = connectedStateserver1;
    state.connectedStateserver2 = connectedStateserver2;


    //解析MqbCan:MQBCAN 字段 MqbCan
    /**
     * 数据类型如下
     * [{Value: "1.21484375", Id: 15}, {Value: "2052.375", Id: 24}, {Value: "-45", Id: 22},…]
     * 具体类型翻看协议4.1.5 表5-3
     * 转换成对象，方便使用
     */
    var mqbCan = state.MqbCan;
    if(null == mqbCan) mqbCan = [];
    var mqbCanObj = {};
    var canName = {
      'key15':'车速,km/h',
      'key24':'转速,rpm',
      'key22':'扭矩,%',
      'key44':'水温,℃',
      'key1602':'瞬时油耗,L/h',
      'key59':'总油耗,L',
      'key70':'总里程,km',
      'key41':'运行总时间,h',
      'key386':'档位(AMT),',
      'key12':'刹车,',
      'key29':'油门,%',
      'key1525':'油位,%',
      'key6':'电瓶电压,V',
      'key37':'机油压力,kPa',
      'key103':'进气压力,kPa',
      'key489':'制动时长,秒',
      'key490':'制动次数,次',
      'key57':'进气温度,℃',
      'key46':'燃油温度,℃',
      'key45':'机油温度,℃',
      'key75':'尿素箱液位,%',
      'key76':'尿素箱温度,℃'
    }

    for(var i=0;i<mqbCan.length;i++){
      var key = 'key'+mqbCan[i].Id;
      mqbCanObj[key] = toFloat(mqbCan[i].Value,2)   ;
      try{
        mqbCan[i].Name = canName[key].split(',')[0];
        mqbCan[i].Label = canName[key].split(',')[1];
        mqbCan[i].Value = toFloat(mqbCan[i].Value,2);
      }catch(e){}
    }
    state.MqbCan = mqbCan;
    state.mqbCanObj = mqbCanObj;


    //开始解析报警
    /**
     *  0 	1：紧急报警，触动报警开关后触发 
        1 	1：超速报警 
        2 	1：疲劳驾驶 
        3 	1：危险驾驶行为预警 
        4 	1：GNSS模块发生故障 
        5 	1：GNSS天线未接或被剪断 
        6 	1：GNSS天线短路 
        7 	1：终端主电源欠压 
        8 	1：终端主电源掉电 
        9 	1：终端LCD或显示器故障 
        10 	1：TTS模块故障 
        11 	1：摄像头故障 
        12 	1：道路运输证IC卡模块故障 
        13 	1：超速预警 
        14 	1：疲劳驾驶预警 
        15	1：违规行驶报警
        16	1：胎压预警
        17 	1：右转盲区异常报警
        18 	1：当天累计驾驶超时 
        19 	1：超时停车 
        20 	1：进出区域 
        21 	1：进出路线 
        22 	1：路段行驶时间不足/过长 
        23 	1：路线偏离报警 
        24 	1：车辆VSS故障 
        25 	1：车辆油量异常 
        26 	1：车辆被盗(通过车辆防盗器) 
        27 	1：车辆非法点火 
        28 	1：车辆非法位移 
        29 	1：碰撞预警 
        30 	1：侧翻预警 
        31	保留 非法开门报警(来自数据库 文档上面写的是保留)
     */
    var alarmMap = {
        'key0':'紧急报警，触动报警开关后触发',
        'key1':'超速报警',
        'key2':'疲劳驾驶',
        'key3':'危险驾驶行为预警',
        'key4':'GNSS模块发生故障',
        'key5':'GNSS天线未接或被剪断',
        'key6':'GNSS天线短路',
        'key7':'终端主电源欠压',
        'key8':'终端主电源掉电',
        'key9':'终端LCD或显示器故障',
        'key10':'TTS模块故障',
        'key11':'摄像头故障',
        'key12':'道路运输证IC卡模块故障',
        'key13':'超速预警',
        'key14':'疲劳驾驶预警',
        'key15':'违规行驶报警',
        'key16':'胎压预警',
        'key17':'右转盲区异常报警',
        'key18':'当天累计驾驶超时',
        'key19':'超时停车',
        'key20':'进出区域',
        'key21':'进出路线',
        'key22':'路段行驶时间不足/过长',
        'key23':'路线偏离报警',
        'key24':'车辆VSS故障',
        'key25':'车辆油量异常',
        'key26':'车辆被盗(通过车辆防盗器)',
        'key27':'车辆非法点火',
        'key28':'车辆非法位移',
        'key29':'碰撞预警',
        'key30':'侧翻预警',
        'key31':'非法开门报警'
    }
    //console.log('开始解析报警数据');
    var alarmFlagArr = num2str(state.AlarmFlag,32);
    var alarmStr = '';
    for(var i=0;i<alarmFlagArr.length;i++){
      if(alarmFlagArr[i] == 1){//有报警
        var key = 'key'+i;
        alarmStr += alarmMap[key]+",";
      }
    }
    if(alarmStr != '') alarmStr = alarmStr.substr(0,alarmStr.length-1);
    state.alarmStr = alarmStr;

    state.Speed=toFloat(state.Speed,2)   
    state.DSpeed=toFloat(state.DSpeed,2)   
    return state;
 }
