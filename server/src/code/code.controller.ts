import { Body, Controller } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { CodeService } from "./code.service";

@Controller('api/code')
export class CodeController {
    constructor(private readonly codeService: CodeService) {}

    @Post('getCodeList')
    getCodeList(@Body() body: any) {
        const groupList = this.codeService.getCodeList(body.group_code);
        return groupList;
    }
}
