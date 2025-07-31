import LoanRepository from '../domain/LoanRepository';

export default class DeleteLoanUseCase {
    constructor(readonly loanRepository: LoanRepository) { }

    async run(pk: string): Promise<boolean> {
        return await this.loanRepository.deleteByPk(pk);
    }
}