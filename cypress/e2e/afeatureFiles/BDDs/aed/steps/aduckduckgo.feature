# cypress\e2e\afeatureFiles\BDDs\aed\steps\aduckduckgo.feature
Feature: duckduckgo.com
  Scenario: visiting the frontpage
    When I visit duckduckgo.com
    Then url should incluse duckduckgo