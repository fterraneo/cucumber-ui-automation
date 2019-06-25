Feature: Article Search

   The user want to search an article

    Scenario Outline: Finding a  Bike
        Given I am on the search page of unieuro
        When I search for "<term>"
        Then at least one element of the first 10 item of the list should have the caption "<caption>"

    Examples:
    | term | caption |
    | bici  |  Bicicletta  |