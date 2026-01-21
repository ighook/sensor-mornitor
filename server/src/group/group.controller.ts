import { Body, Controller } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { GroupService } from "./group.service";

@Controller('api/group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Post('getGroupList')
    getGroupList(@Body() body: any) {
        const groupList = this.groupService.getGroupList();
        return groupList;
    }
}
