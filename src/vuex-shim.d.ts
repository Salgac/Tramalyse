import { ComponentCustomProperties } from "vue";
import { Store } from "@/store";

declare module "@vue/runtime-core" {
  interface State {
    count: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
