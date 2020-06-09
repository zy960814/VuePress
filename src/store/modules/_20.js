// 56020业务系统相关状态管理
const _20 = {
  state: {
    // 文物临时进境展览申请, 新增文物或复仿制品的事项ID
    tempEntryItemId: null,
    // 临时进境申请表单, 当前选中项
    tempEntryApplyCurrItem: {
      id: null,
      listQuery: false,  // 是否列表查询
      detailQuery: false,  // 是否详情查询
      key: 0
    }
  },
  mutations: {
    SET_TEMP_ENTRY_ITEM_ID: (state, itemId) => {
      state.tempEntryItemId = itemId;
    },
    SET_TEMP_ENTRY_APPLY_CURR_ITEM: (state, currentItem) => {
      state.tempEntryApplyCurrItem = currentItem;
    }
  },
  actions: {
    setTempEntryItemId ({ commit }, itemId) {
      commit('SET_TEMP_ENTRY_ITEM_ID', itemId);
    },
    setTempEntryApplyCurrItem ({ commit, state }, item) {
      const {id, listQuery, detailQuery} = item;
      commit('SET_TEMP_ENTRY_APPLY_CURR_ITEM', {
        id,
        listQuery,
        detailQuery,
        key: state.tempEntryApplyCurrItem.key + 1
      });
    }
  }
};

export default _20
