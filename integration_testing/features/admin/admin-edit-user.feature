Feature: Admin edit users
  Admin needs to be able to edit user's full name and username, reset the passwords, change the user types, and delete them from the facility

  Background:
    Given I am signed in to Kolibri as admin user
      And I am on *Facility > Users* page

  Scenario: Admins cannot edit the user account details of a Super admin
    When I find a Super admin in the Users list
    Then I see that the *Options* dropdown button is disabled for them

  Scenario: Edit user's full name
    When I click on *Options* button for the user I want to edit
      And I select *Edit details* option
    Then I see *Edit user details* modal
    When I click or tab into *Full name* field
      And I edit the full name as needed
      And I click the *Save* button
    Then the modal closes
      And I see the user with edited full name

  Scenario: Edit user's username
    When I click on *Options* button for the user I want to edit
      And I select *Edit details* option
    Then I see *Edit user details* modal
    When I click or tab into *Username* field
      And I edit the username as needed
      And I click the *Save* button
    Then the modal closes
      And I see the user with edited username

  Scenario: Change user type
    When I click on *Options* button for the user I want to edit
      And I select *Edit details* option
    Then I see *Edit user details* modal
    When I click or tab into *User type*
    Then the dropdown opens
    When I select the new role
      And I click the *Save* button
    Then the modal closes
      And I see the user with edited type (label or no label depending on the change)
# TODO: add options for the 2 coach types

  Scenario: Change own user type
    Given I am not a Super admin
    When I click on *Options* button for myself
      And I select *Edit* option
    Then I see *Edit user* modal
    When I click or tab into *User type*
    Then the dropdown opens
    When I select a role other than Admin
      And I click the *Save* button
    Then I am taken to the *Sign in* page


  Scenario: Reset user's password
    When I click on *Options* button of the user I want to reset password for
      And I select *Reset password* option
    Then I see *Reset user password* modal
    When I click or tab into *New password* field
      And I enter the new password
      And I click or tab into *Confirm new password* field
      And I re-enter the new password
      And I click the *Save* button
    Then the modal closes
      And I see the *Facility > Users* page again # no confirmation that the password has been reset

  Scenario: Admin can see the label *Admin* next to their full name, not their facility role
      When I scroll to my name in the user list
      Then I see a label *Admin* next to my full name

  Scenario: Admin can’t delete themselves
    When I scroll to my name in the user list
      And I click on the *Options* dropdown button
    Then I see that the *Delete* action is disabled
