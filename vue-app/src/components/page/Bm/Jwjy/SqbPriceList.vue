<template>
	<div>

		<table id="customers">
			<tr>
				<th>课程</th>
				<th>招生对象</th>
				<th>简介</th>
				<th>价格</th>
			</tr>
			<tr v-for="(el,index) in priceList" :class="index%2==1?'alt':''">
				<td>{{el.name}}</td>
				<td>{{el.grade}}</td>
				<td>{{el.desc}}</td>
				<td>{{el.price}}</td>
			</tr>
		</table>

    <div class="course-hd">
      <div>
        <p>① 五月份报名享受8.8折优惠，六月份报名享受9折优惠； <br> ② 团报3人起每人送166现金抵用券。 </p>
      </div>
    </div>

    <div class="course-hd">
      <div>
        <p>本机构采用全天制教学。三师一班。周一至周五早9:00至下午4:30。</p>
      </div>
    </div>

	</div>
	
</template>



<script type="text/javascript">

import { burialPointLogsCreate } from '@/api/sun';

export default {
	name: '',
	data(){
		return {
			priceList: [{
				name: '暑假托管班',
				grade: '幼小衔接、一年级、二年级',
				price: '2450',
				desc: '辅导完成暑假作业，送一门课程（指定）',
			},{
				name: '暑假课时班',
				grade: '一年级 ~ 六年级',
				price: '2980',
				desc: '纯课时，三师一班制，语数英全科巩固，下学期重难点知识详细讲解',
			},{
				name: '暑假提优班',
				grade: '一年级 ~ 六年级',
				price: '3680',
				desc: '资深老师指导重难点突破。奥数分析讲解。当堂讲解及时大量题型练习。冲刺满分！！（报名建议每科成绩不低于80分）',
			},{
				name: '精品1对1',
				grade: '一年级 ~ 六年级',
				price: '120/小时',
				desc: '',
			},{
				name: '绘画班',
				grade: '幼小衔接，一到三年级',
				price: '1260',
				desc: '儿童画、水墨、素描；18课时',
			},{
				name: '书法班',
				grade: '小学',
				price: '1260',
				desc: '硬笔书法、中国书法、字里千秋、阐释书法精神；18课时',
			}]
		}
	},
  created() {
    // this.$parent.setTitle('')
    this.createLog()

  },
  methods: {
    // 埋点日志
    createLog(){
      const logForm = {
        title: '金屋-暑期班-价格',
        user: '0',
        content: JSON.stringify({
          url: window.location.href,
          UA: window.navigator.userAgent,
        }),
        category: 'JwjySqbPrice',
      };
      burialPointLogsCreate(logForm).then(res=>{
        // 
      })
    },
  }
}
</script>

<style type="text/css" scoped>
#customers {
	font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
	width:100%;
	border-collapse:collapse;
}

#customers td,
#customers th {
  font-size:1em;
  border:1px solid #41845c;
  padding:3px 7px 2px 7px;
  width: 1%;
}

#customers td:nth-child(2),
#customers th:nth-child(2) {
  width: 1%;
}

#customers td:nth-child(3),
#customers th:nth-child(3) {
  width: 2%;
}

#customers th {
  font-size:1.1em;
  text-align:left;
  padding-top:5px;
  padding-bottom:4px;
  background-color:#41845c;
  color:#ffffff;
}

#customers tr.alt td {
  color:#000000;
  background-color:#EAF2D3;
}


.course-hd {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 30px;
  text-align: left;
  background-color: #a7c941;
  margin-top: 10px;
}
.course-hd > div {
  background-color: #42845c;
  padding: 5px 30px;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
</style>

