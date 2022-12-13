//vì muốn xử lý cho validation sau này nên ta dùng class

export default class CreateRecruitDto {
    constructor(
        title: string,
        description: string,
        position: string,
        count: string,
        condition: string,
        benefit: string,
    ) {
        this.title = title;
        this.description = description;
        this.position = position;
        this.count = count;
        this.condition = condition;
        this.benefit = benefit;
    }
    public title: string;

    public description: string;

    public position: string;

    public count: string;
    public condition: string;
    public benefit: string;
}
