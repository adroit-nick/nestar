import { registerEnumType } from "@nestjs/graphql";

export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong!",
  NO_DATA_FOUND = "No data is found!",
  CREATE_FAILED = "Create is failed!",
  UPDATE_FAILED = "Update is failed!",
  REMOVE_FAILED = "Remove failed!",
  UPLOAD_FAILED = "Upload failed!",
  BAD_REQUEST = "Bad request!",

  USED_MEMBER_NICK_OR_PHONE = "Already used member nick or phone!",
  NO_MEMBER_NICK = "No member with that nickname!",
  BLOCKED_USER = "You have been blocked, contact restaurant! ",
  WRONG_PASSWORD = "Password is incorrect, please try again!",
  NOT_AUTHENTICATED = "You are not authenticated, Please login first!",
  TOKEN_NOT_EXIST = "Bearer Token is not provided!",
  ONLY_SPECIFIC_ROLES_ALLOWED = "Allowed only for members with specific role! ",
  NOT_ALLOWED_REQUEST = "Not allowed request!",
  PROVIDE_ALLOWED_FORMAT = "Please provide jpg, jpeg, or png images!",
  SELF_SUBSCRIPTION_DENIED = "Self subscription denied!",
  USED_NICK_PHONE = "You are inserting already used nick or phone number!",
}

export enum Direction {
  ASC = 1,
  DESC = -1,

}

registerEnumType(Direction, {
  name: "Direction"
});