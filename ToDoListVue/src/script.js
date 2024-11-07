const app = Vue.createApp({
    data() {
        return {
            newTextItem: '',
            items: [],
            showErrorMessage: false
        };
    },
    methods: {
        addToList() {
            this.showErrorMessage = false;

            if (this.newTextItem.trim() !== '') {
                this.items.push({
                    id: Date.now(),
                    text: this.newTextItem.trim(),
                    isEditing: false,
                    originalText: this.newTextItem.trim()
                });
                this.newTextItem = '';
            } else {
                this.showErrorMessage = true;
            }
        },
        editItem(item) {
            item.isEditing = true;
            item.originalText = item.text;
        },
        saveItem(item) {
            item.text = item.text.trim();
            item.isEditing = false;
        },
        deleteItem(item) {
            if (confirm("Вы уверены, что хотите удалить задачу?")) {
                this.items = this.items.filter(i => i.id !== item.id);
            }
        },
        cancelItem(item) {
            item.text = item.originalText;
            item.isEditing = false;
        }
    }
});

app.mount('#app');