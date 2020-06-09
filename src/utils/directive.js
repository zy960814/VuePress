//全局自定义指令
const importDirective = Vue => {
    Vue.directive('double', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
            el.addEventListener('click', e => {
                console.log('-----------------')
                console.log(el)
                if (!el.disabled) {
                    el.disabled = true
                    el.style.cursor = 'not-allowed'
                    setTimeout(() => {
                        el.style.cursor = 'pointer'
                        el.disabled = false
                    }, 500)
                }
            })
        }
    })
    Vue.directive('loadMore', {
        bind(el) {
            const selectWrap = el.querySelector('.el-table__body-wrapper')
            selectWrap.addEventListener('scroll', function () {
                window.sessionStorage.setItem('loadTop', this.scrollTop)
                window.sessionStorage.setItem('loadLeft', this.scrollLeft)
            })
        },
        componentUpdated(el) {
            const selectWrap = el.querySelector('.el-table__body-wrapper')
            let l = window.sessionStorage.getItem('loadLeft') || 0
            let t = window.sessionStorage.getItem('loadTop') || 0
            setTimeout(() => {
                selectWrap.scrollTo(l, t)
            }, 200)
        },
        update() {}
    })
}

export default importDirective