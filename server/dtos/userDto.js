module.exports = class UserDto {
    UserID;
    Username;
    Email;
    IsAdmin;
    constructor(model) {
        this.UserID = model.UserID;
        this.Username = model.Username;
        this.Email = model.Email;
        this.IsAdmin = model.IsAdmin;
    }
}