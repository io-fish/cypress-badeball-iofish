const  report = require("multiple-cucumber-html-reporter");
const fs = require("fs");

report.generate({
    jsonDir: "reports/json/",
    reportPath: "./reports/multiple-html-report/",
    displayReportTime: true,
    openReportInBrowser: true,
    displayDuration: true,
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
                {label: "Environment", value: "Local"},
                {label: 'Execution Date', value: new Date().toUTCString()},
            ],
    },
})