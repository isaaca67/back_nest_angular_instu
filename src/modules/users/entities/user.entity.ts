import { Column, Entity, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { Persona } from '../../personas/entities/persona.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  mail: string;

  @Column()
  password: string;

  @OneToOne(() => Persona, (persona) => persona.user, { cascade: true })
  persona: Relation<Persona>;

}