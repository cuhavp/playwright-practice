// @ts-check
const { test, expect } = require("@playwright/test");
const { ToDoPage } = require("../pages/todos.page.js");

let todoPage;
test.describe("todo MVC demo app", () => {
    test.beforeEach("open page", async ({ page }) => {
        todoPage = new ToDoPage(page);
        await todoPage.goto();
    });
    test("should allow to edit task name", async ({ page }) => {
        await todoPage.addNewTask("task 1");
        const todoItems = await todoPage.getItems();
        await todoPage.renameTask(0, "task 2");
        await expect(todoItems).toHaveText(["task 2"]);
    });

    test("should able create new task", async ({ page }) => {
        const beforeItems = await todoPage.getNumberItemsLeft();
        await todoPage.addNewTask("task 1");
        const afterItems = await todoPage.getNumberItemsLeft();

        await expect(afterItems - beforeItems).toEqual(1);
    });

    test("should able to mark complte a task", async ({ page }) => {
        await todoPage.addNewTask("task 1");
        await todoPage.markCompleteTask(0);
        const item = await todoPage.getItem(0);
        await expect(item).toHaveClass("completed");
    });

    test("should able to delete a task", async ({ page }) => {
        await todoPage.addNewTask("task 1");
        const beforeItems = await todoPage.getNumberItemsLeft();

        await todoPage.deleteItem(0);

        const afterItems = await todoPage.getNumberItemsLeft();
        await expect(beforeItems - afterItems).toEqual(1);
    });
});
