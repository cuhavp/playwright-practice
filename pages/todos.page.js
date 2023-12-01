const { expect } = require("@playwright/test");

exports.ToDoPage = class ToDoPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.addNewTaskTxt = page.getByPlaceholder("What needs to be done?");
        this.itemList = page.locator(".todo-list li");
    }

    async goto() {
        await this.page.goto("/examples/vanillajs");
    }

    async addNewTask(taskName) {
        await this.addNewTaskTxt.fill(taskName);
        await this.addNewTaskTxt.press("Enter");
    }

    async getItems() {
        const items = await this.itemList;
        return items;
    }
    async getNumberItemsLeft() {
        return (await this.itemList.all()).length;
    }

    async renameTask(nth, newTaskName) {
        await this.itemList.nth(nth).dblclick();
        await this.itemList.nth(nth).locator(".edit").clear();
        await this.itemList.nth(nth).locator(".edit").fill(newTaskName);
        await this.itemList.nth(nth).locator(".edit").press("Enter");
    }
    async markCompleteTask(nth) {
        await this.itemList.nth(nth).getByRole("checkbox").click();
    }
    async getItem(nth) {
        const item = await this.itemList.nth(nth);
        return item;
    }

    async deleteItem(nth) {
        await this.itemList.nth(nth).hover();
        await this.itemList.nth(nth).locator(".destroy").click();
    }
};
