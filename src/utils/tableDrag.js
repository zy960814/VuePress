// import $ from 'jquery' //在需要使用的页面中
const tableDrag = {
    // 添加监听器
    addThListener() {
        let thArr = document.querySelectorAll('th')
        for (let i = 0; i < thArr.length - 1; i++) {
            let element = thArr[i].childNodes[0]
            if (element.addEventListener) {
                //所有主流浏览器，除了 IE 8 及更早 IE版本
                element.addEventListener('dragover', this.allowDrop)
                element.addEventListener('drop', this.drop)
                element.addEventListener('dragstart', this.drag)
            } else if (element.attachEvent) {
                // IE 8 及更早 IE 版本
                element.attachEvent('dragover', this.allowDrop)
                element.attachEvent('drop', this.drop)
                element.attachEvent('dragstart', this.drag)
            }
            element.setAttribute('draggable', true)
            element.parentNode.setAttribute('id', i)
        }
    },
    // 移除监听器
    reThListener() {
        let thArr = document.querySelectorAll("th");
        for (let i = 0; i < thArr.length - 1; i++) {
            let element = thArr[i].childNodes[0];
            if (element.removeEventListener) { //所有主流浏览器，除了 IE 8 及更早 IE版本
                element.removeEventListener("dragover", this.allowDrop);
                element.removeEventListener("drop", this.drop);
                element.removeEventListener("dragstart", this.drag);
            } else if (element.detachEvent) { // IE 8 及更早 IE 版本
                element.detachEvent("dragover", this.allowDrop);
                element.detachEvent("drop", this.drop);
                element.detachEvent("dragstart", this.drag);
            }
        }
    },
    drag(ev) {
        ev.dataTransfer.setData("Text", ev.target.id);
    },
    allowDrop(ev) {
        ev.preventDefault();
    },
    drop(ev) {
        // 阻止默认行为
        ev.preventDefault()
        let oldIndex = ev.target.parentNode.id
        let newIndex = ev.dataTransfer.getData('Text')
        // 切换表头内容
        // this.swap(oldIndex, newIndex)

        // 切换表头对应数据
        this.dropCol.splice(
            oldIndex,
            1,
            ...this.dropCol.splice(newIndex, 1, this.dropCol[oldIndex])
        )
    },
    // swap(oldIndex, newIndex) {
    //     console.log(oldIndex)
    //     console.log(newIndex)
    //     console.log($(`#${newIndex}`).find('div'))
    //     var oldChildClone = $(`#${oldIndex}`).find('div')
    //     // var newChildClone = $(`#${newIndex}`)
    //     //   .find('div')
    //     //   .clone(true)
    //     $(`#${oldIndex}`)
    //         .empty()
    //         .prepend($(`#${newIndex}`).find('div'))
    //     $(`#${newIndex}`)
    //         .empty()
    //         .prepend(oldChildClone)
    // },
}
export default tableDrag