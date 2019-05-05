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

	</div>
	
</template>



<script type="text/javascript">
export default {
	name: '',
	data(){
		return {
			priceList: [{
				name: '暑假托管班',
				grade: '小班、一年级、二年级',
				price: '2300',
				desc: '辅导完成暑假作业，巩固旧知识，预习下学期课程',
			},{
				name: '暑假课时班',
				grade: '一年级 ~ 六年级',
				price: '2880',
				desc: '纯课时，三师一班制，语数英全科巩固，下学期重难点知识详细讲解',
			},{
				name: '暑假提优班',
				grade: '一年级 ~ 九年级',
				price: '3200',
				desc: '建议成绩每科不低于80分，资深老师指导，重难点突破',
			},{
				name: '精品1对1',
				grade: '一年级 ~ 九年级',
				price: '120/小时',
				desc: '更进一步，冲刺100（一班4人）',
			}]
		}
	},
  created() {
    // this.$parent.setTitle('')
  },
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

