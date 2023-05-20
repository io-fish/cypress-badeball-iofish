# cypress\e2e\bfeatureFiles\bduckduckgo.feature
Feature: duckduckgo.com
  Scenario: visiting the frontpage
    When I visit duckduckgo.com
    Then title should include DuckDuckGo