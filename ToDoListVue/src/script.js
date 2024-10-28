const app = Vue.createApp({
    data() {
        return {
            newItem: '',
            items: []
        };
    },
    methods: {
        addInList(event) {
            event.preventDefault();
            if (this.newItem.trim() !== '') {
                this.items.push({text: this.newItem, isEditing: false, originalText: this.newItem});
                this.newItem = '';
            }
        },
        editItem(index) {
            this.items[index].isEditing = true;
        },
        saveItem(index) {
            this.items[index].isEditing = false;
        },
        deleteItem(index) {
            this.items.splice(index, 1);
        },
        cancelItem(index) {
            this.items[index].text = this.items[index].originalText
            this.items[index].isEditing = false;
        }
    }
});

app.mount("#app");