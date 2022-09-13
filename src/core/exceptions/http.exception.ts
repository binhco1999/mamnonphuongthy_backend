//vì muốn có constructor nên ở đây sử dụng class nếu muốn chỉ khai báo thuộc tính không thì dùng interface
// extend lại cái method error của typescript
class HttpException extends Error {
    public status: number;
    public message: string;

    //cú pháp typescript kế thừa thì phải có super và truyền vào thằng cha những thứ nó cần
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
export default HttpException;
