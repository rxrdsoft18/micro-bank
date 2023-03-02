import {
  IntegrationEventPublisher,
  Topic,
} from '../../application/events/integration-events';
import { IEvent } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import {
  CreateTopicCommand,
  PublishCommand,
  SNSClient,
} from '@aws-sdk/client-sns';

@Injectable()
export class SNSEventPublisher implements IntegrationEventPublisher {
  private readonly snsClient;
  private readonly logger = new Logger(SNSEventPublisher.name);
  constructor(private readonly configService: ConfigService) {
    this.snsClient = new SNSClient({
      region: this.configService.get('AWS_REGION'),
    });
  }

  async publish(Name: Topic, body: IEvent): Promise<void> {
    const message = {
      TopicArn: (await this.snsClient.send(new CreateTopicCommand({ Name })))
        .TopicArn,
      Message: JSON.stringify(body),
    };
    await this.snsClient.send(new PublishCommand(message));
    this.logger.log(`Message published. Message: ${JSON.stringify(body)}`);
  }
}
