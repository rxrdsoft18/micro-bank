import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { DeleteMessageCommand, ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class SQSEventConsumer implements OnModuleDestroy {
  private readonly logger = new Logger(SQSEventConsumer.name);

  private readonly sqsClient = new SQSClient({
    region: this.configService.get('AWS_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  @Interval(5000)
  async handleMessage(): Promise<void> {
    console.log(this.configService.get('AWS_DEPOSITED_ENDPOINT'));
    const response = (
      await this.sqsClient.send(
        new ReceiveMessageCommand({
          QueueUrl: this.configService.get('AWS_DEPOSITED_ENDPOINT'),
          AttributeNames: ['All'],
          MessageAttributeNames: ['All'],
          MaxNumberOfMessages: 1,
        }),
      )
    ).Messages;

    if (!response || !response[0] || !response[0].Body) return;

    this.logger.log(
      `Message received from queue. Message: ${JSON.stringify(response)}`,
    );

    await this.sqsClient.send(
      new DeleteMessageCommand({
        QueueUrl: this.configService.get('AWS_DEPOSITED_ENDPOINT'),
        ReceiptHandle: response[0].ReceiptHandle,
      }),
    );
  }

  onModuleDestroy(): any {
    this.sqsClient.destroy();
  }
}
