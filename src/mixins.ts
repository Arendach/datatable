export default {
    methods: {
        cellValue(item: any, field: string) {
            return field?.split('.').reduce((obj, key) => obj?.[key], item)
        },
    },
}