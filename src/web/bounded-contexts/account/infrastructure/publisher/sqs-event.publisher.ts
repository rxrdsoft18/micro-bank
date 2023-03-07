import {
  IntegrationProducerEvent,
  Message,
} from '../../application/events/integration-events';
import { Injectable, Logger } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SQSEventPublisher implements IntegrationProducerEvent {
  private readonly logger = new Logger(SQSEventPublisher.name);

  private readonly sqsClient = new SQSClient({
    region: this.configService.get('AWS_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async publish(url: string, message: Message): Promise<void> {
    const params = {
      QueueUrl: url,
      MessageBody: JSON.stringify(message),
    };
    await this.sqsClient.send(new SendMessageCommand(params));
    // return Promise.resolve(undefined);
    this.logger.log(
      `Message send in queue. Message: ${JSON.stringify(message)}`,
    );
  }
}
