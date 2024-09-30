import { Response } from '@common/http/Response';
import Result from '@common/http/Result';
import { Req, Status } from '@modules/shared/infrastructure';
import { injectable } from 'inversify';

@injectable()
export default class StatusGetController {
    static async run(req: Req): Promise<Response<Status | null>> {
        return Result.ok<Status>({ ok: 'cualquier coaaasa', otra_cosa: req });
    }
}
