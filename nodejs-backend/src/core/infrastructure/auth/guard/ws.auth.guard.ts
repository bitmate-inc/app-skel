import {CanActivate, ExecutionContext, HttpException, mixin, Type} from '@nestjs/common';
import {AuthGuard, IAuthGuard} from '@nestjs/passport';
import {memoize} from '@nestjs/passport/dist/utils/memoize.util';
import {WsException} from '@nestjs/websockets';
import {Socket} from 'socket.io';

export const WsAuthGuard: (
	type?: string | string[]
) => Type<IAuthGuard> = memoize(createWsAuthGuard);

function createWsAuthGuard(type?: string | string[]): Type<CanActivate> {

	class WsMixinAuthGuard extends AuthGuard(type) {

		getRequest(context: ExecutionContext) {
			return context.switchToWs().getClient<Socket>().handshake;
		}

		handleRequest(err, user, info, context) {
			try {
				return super.handleRequest(err, user, info, context);
			} catch (e) {
				if (!(e instanceof HttpException)) {
					throw e;
				}

				throw new WsException(e.getResponse());
			}
		}
	}

	return mixin(WsMixinAuthGuard);
}
