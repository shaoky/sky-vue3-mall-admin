import { filtersModel } from './utils/filter'
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $filters: filtersModel
    }
}