import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity() 
 export class User { 
   @PrimaryGeneratedColumn('uuid') 
   id: string; 
  
   @Column() 
   fullname: string;  
  
   @Column({ unique: true }) 
   email: string; 
  
   @Column() 
   password: string; 

   @Column() 
   phone: string;

   @Column() 
   role: string; 

   @Column() 
   isDeleted: boolean; 
  
   @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' }) 
   createdAt: Date; 

   @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' }) 
   updatedAt: Date; 
 }