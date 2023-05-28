@login @regression
Feature: WebdriverUniversity - Login page

        Scenario Outline: Test valid and invalid credentials
                Given I navigate to the WebdriverUniversity homepage
                When I click on the login portal button
                And I enter a username <username>
                And I enter a password <password>
                And I click the login button
                Then I should see an alert box which contains text '<message>'

                Examples:
                        | username       | password     | message              |
                        | webdriver      | webdriver123 | validation succeeded |
                        | webdriver      | wrong_pass   | validation failed    |
                        | wrong_username | webdriver123 | validation failed    |
                        | wrong_username | wrong_pass   | validation failed    |
