import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy
  ) {}

  async create(createReservationDto: CreateReservationDto, { email, _id: userId}) {

    return this.paymentsService.send('create_charge', {...createReservationDto.charge, email}).pipe(map((res) => {
    return this.reservationsRepository.create({
        ...createReservationDto,
        timestamp: new Date(),
        invoiceId: res.id,
        userId,
      });
    }))
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

 async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAdDelete({ _id });
  }
}
