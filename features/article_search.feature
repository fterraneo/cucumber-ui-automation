Feature: Article Search

   The user want to search an article

    Scenario: Finding a Playstation 4
        Given I am on the search page of unieuro
        When I search for "PS4"
        Then at least one element of the first 10 item of the list should have the caption "Playstation 4"