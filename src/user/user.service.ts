import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDTO } from './dto/create-user.dto';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import ApiResponse from 'src/utils/ApiResponse';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {}

  async createUser(dto: RegisterDTO) {
    try {
      const hashedPassword = await hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          // role:dto.role,
          name:dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });
      // await this.mailService.sendWelcomeEmail({ names: `${user.first_name} ${user.last_name}`, email: user.email })
      return ApiResponse.success('User Created successfully', user);
    } catch (error) {
      if (error.code === 'P2002') {
        const key = error.meta.target[0];
        return ApiResponse.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} already exists`,
          error,
        );
      }
      console.log(Object.keys(error));
      return ApiResponse.error('Internal server error', error);
    }
  }


  async getUserById(id: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      console.log('Error getting all users:', error);
      throw error;
    }
  }


  async deleteUserById(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return deletedUser;
    } catch (error) {
      console.log('Error deleting user:', error);
      throw error;
    }
  }

  async updateResetToken(userId: number, resetToken: string): Promise<void> {
    try {
      const updatedUser = await this.prisma.user.updateMany({
        where: { id: userId },
        data: { resetToken },
      });
      console.log(updatedUser);
    } catch (error) {
      console.log('Error updating reset token:', error);
      throw error;
    }
  }

  async getUserByResetToken(resetToken: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          resetToken,
        },
      });
      return user;
    } catch (error) {
      console.log('Error getting user by reset token:', error);
      throw error;
    }
  }

  async updatePasswordAndClearToken(
    userId: number,
    newPassword: string,
  ): Promise<void> {
    try {
      const hashedPassword = await hash(newPassword, 10);

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
          resetToken: null, // Clear the reset token
        },
      });
    } catch (error) {
      console.log('Error updating password and clearing token:', error);
      throw error;
    }
  }

  // async verifyEmail(userId: string): Promise<boolean> {
  //   try {
  //     const user = await this.prisma.user.update({
  //       where: { id: userId },
  //       data: {
  //         verification: {
  //           update: {
  //             verification_status: 'VERIFIED',
  //           },
  //         },
  //       },
  //     });

  //     if (user) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log('Error verifying email:', error);
  //     throw error;
  //   }
  // }
}
