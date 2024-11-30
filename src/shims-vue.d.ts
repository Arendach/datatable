declare module "*.vue" {
  import {DefineComponent} from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@/stores/data-table-store'
declare module '@/stores/filter-store'
declare module '@/stores/paginate-store'
declare module '@/stores/representation-store'

