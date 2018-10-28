export class Permission {
    role: string;
    currentDate: string;
    mainMenuPermission: [string];
    menuPermission: [string];
    constructor(
        role: string,
        currentDate: string,
        mainMenuPermission: [string],
        menuPermission: [string]
    ) {
        this.role = role;
        this.currentDate = currentDate;
        this.mainMenuPermission = mainMenuPermission;
        this.menuPermission = menuPermission;
    }
}