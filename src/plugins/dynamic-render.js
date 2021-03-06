import Vue from "vue";
Vue.prototype.$bus = new Vue();

const container = {
  name: "dynamic-container",
  data() {
    return {
      childComp: []
    };
  },
  created() {
    Vue.prototype.$bus.$on(
      "append-child",
      (compInstance, { attrs, on, ...args }) => {
        this.childComp.push({
          compInstance,
          attrs,
          on,
          ...args
        });
      }
    );
    Vue.prototype.$bus.$on("delete-child", (compInstance) => {
      this.childComp = this.childComp.filter(
        (child) => child.compInstance !== compInstance
      );
    });
  },
  render(h) {
    return h(
      "div",
      {
        attrs: {
          class: "dynamic-container"
        }
      },
      this.childComp.map(
        ({ compInstance, attrs, on, scopedSlots, ...args }) => {
          return h(compInstance, {
            attrs,
            props: attrs,
            on,
            scopedSlots: scopedSlots(h),
            ...args
          });
        }
      )
    );
  }
};

const containerComp = Vue.extend(container);
const instance = new containerComp({
  el: document.createElement("div")
});
document.body.appendChild(instance.$el);

function createDynamicComp(component, { attrs, on, ...args }) {
  const compInstance = Vue.extend(component);
  Vue.prototype.$bus.$emit("append-child", compInstance, {
    attrs,
    on,
    ...args
  });
  return compInstance;
}

function deleteDynamicComp(compInstance) {
  Vue.prototype.$bus.$emit("delete-child", compInstance);
}

export { createDynamicComp, deleteDynamicComp };
