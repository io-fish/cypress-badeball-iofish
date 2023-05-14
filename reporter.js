const  report = require("multiple-cucumber-html-reporter");
const fs = require("fs");

report.generate({
    jsonDir: "reports/json/",
    reportPath: "./reports/multiple-html-report/",
    metadata: {
        browser: {
            name: "Chrome",
            version: "1.0.0",
        },
        device: "Local test machine",
        platform: {
            name: "Windows",
        },
    },
        reportName: "Cypress suite run",
        customData: {
            title: "Run info",
            data: [
                {label: "Project", value: "Cypress daily run"},
                {label: "Environment", value: "Local"}
            ],
    },
})