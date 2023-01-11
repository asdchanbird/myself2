<script setup>
import { ref,onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
import HelloWorld from './components/HelloWorld.vue'
const text = ref('');
const undoitem = ref([]);
const doitem = ref([]);
const local = ref([]);
const list =ref([]);
const localDone =ref([])
const listDone = ref([])
const add = ()=> {
    if(text.value===''){
        alert('請輸入待辦事項')
    }else{
        undoitem.value.push(text.value);
        localStorage.setItem("undo", undoitem.value)
        local.value = localStorage.getItem("undo")
        list.value = local.value.split(',')
        text.value = '';
    }
}
const compelete =(index)=> {
    doitem.value.push(undoitem.value[index]);
    list.value.splice(index, 1);
    if(undoitem.value.length>1){
        if(index == undoitem.value.length-1){
            localStorage["undo"] = localStorage["undo"].replace(`${undoitem.value[index]}`,``)
            undoitem.value.splice(index,1)
        }else{
            localStorage["undo"] = localStorage["undo"].replace(`${undoitem.value[index]},`,``)
            undoitem.value.splice(index,1)
        }
    }else{
        localStorage.removeItem('undo');
        undoitem.value.splice(index,1)
    }
    localStorage.setItem("done", doitem.value)
    localDone.value = localStorage.getItem("done")
    listDone.value = localDone.value.split(',')
}
const clear = (index)=> {
    if(undoitem.value.length>1){
        if(index == undoitem.value.length-1){
            localStorage["undo"] = localStorage["undo"].replace(`${undoitem.value[index]}`,``)
            undoitem.value.splice(index,1)
        }else{
            localStorage["undo"] = localStorage["undo"].replace(`${undoitem.value[index]},`,``)
            undoitem.value.splice(index,1)
        }
    }else{
        localStorage.removeItem('undo');
        undoitem.value.splice(index,1)
    }
    list.value.splice(index, 1);
}
const deleteAll =() => {
    doitem.value = [];
    listDone.value = [];
    localStorage.removeItem("done")
}
const resetwindow = ()=> {
    local.value = localStorage.getItem("undo")
    list.value = local.value.split(',')
}   
onMounted(()=>{
    resetwindow();
});
</script>

<template>
    <div class="todolist">
        <div class="wrap">
        <h1>TODO LIST</h1>
        <div class="input">
            <Input v-model="text" placeholder="新增待辦事項" />
            <Button class="btn" @click="add()">+</Button>
        </div>
        <div class="dolist">
            <strong class="left">待辦事項:</strong>
            <br><br>
            <List border>
                <ListItem v-for="(item,index) in list" :key="index" class="list">
                    <div class="listText">
                        <p>{{item}}</p>
                    </div>
                    <div class="icon">
                        <Icon type="md-done-all" class="done" @click="compelete(index)"/>
                        <Icon type="md-trash" class="delete" @click="clear(index)"/>
                    </div>
                </ListItem>
            </List>
            <h5>待處理事項 : {{list.length}}</h5>
            <br><br>
            <strong class="left">完成事項:</strong>
            <br><br>
            <List border>
                <ListItem v-for="(item,index) in listDone" :key="index" class="list">
                    <p>{{item}}</p>
                    <div class="icon">
                    </div>
                </ListItem>
            </List>
            <h5>待處理事項 : {{listDone.length}}</h5>
            <div class="clearBtn">
                <Button type="error" @click="deleteAll()">清除所有完成事項</Button>
            </div>
        </div>
    </div>
    </div>
</template>

<style lang="scss" scoped>
// @import "bootstrap/scss/bootstrap";
    .btn {
        margin: 0 10px;
        background-color: #17233d;
    }
    button {
        color: #ffffff;
    }
    h5 {
        margin: 15px;
    }
    .dolist {
        margin: 20px 0 0 0;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
        padding: 20px 10px;
        strong {
            text-align: left;
        }
    }
    .input {
        display: flex;

    }
    .list {
        display: flex;
        justify-content: space-between;
    }
    .listText {
        width: 100%;
        text-align: left;
    }
    .icon {
            display: flex;
            justify-content: flex-end;
        }
    .delete,.done {
        margin: 0 10px;
        cursor: pointer;
    }   
    .todolist{
        margin: 0 auto;
        display: flex;
        width: 1200px;
        justify-content: center;
        .wrap {
            width: 400px;
        }
    }
    h1 {
        margin: 20px;
        letter-spacing: 5px;
        font-weight: 900;
    }
    .clearBtn {
        margin: 20px 10px;
    }
</style>
