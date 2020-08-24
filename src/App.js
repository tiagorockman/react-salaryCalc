import React, { Component } from 'react';
import InputReadOnly from './components/InputReadOnly';
import ProgressBarSalary from './components/ProgressBarSalary';
import { toReal, percentCalc } from './helpers/formatNumber';
import { calculateSalaryFrom } from './helpers/salary';
import Footer from './components/Footer';

import css from './components/inputReadonly.module.css';
import cssprogress from './components/prgressBarSalary.module.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      dependentes: 0,
      fullSalary: '',
      salaryCalculated: {
        baseINSS: 0.0,
        discountINSS: 0.0,
        baseIRPF: 0.0,
        discountIRPF: 0.0,
        netSalary: 0.0,
      },
      percentINSS: 0,
      percentIRPF: 0,
      percentSalary: 0,
    };
  }

  handleSalaryChange = (event) => {
    const fullSalary = Number(event.target.value);
    if (isNaN(fullSalary)) {
      //aceita apenas números
      return;
    }
    this.setState({ fullSalary });
  };

  handleDepChange = (event) => {
    const valor = event.target.value;
    this.setState({ dependentes: valor });
  };

  componentDidUpdate = (_, previusState) => {
    //  console.log('Chamou componentDidUpdate');
    const {
      fullSalary: oldFullSalary,
      dependentes: oldDependentes,
    } = previusState;
    const {
      fullSalary: newFullSalary,
      dependentes: newDependentes,
    } = this.state;

    if (oldFullSalary !== newFullSalary || oldDependentes !== newDependentes) {
      const calculatedSalary = calculateSalaryFrom(
        this.state.fullSalary,
        this.state.dependentes
      );

      this.setState({
        salaryCalculated: calculatedSalary,
        percentINSS: percentCalc(
          calculatedSalary.discountINSS,
          calculatedSalary.baseINSS
        ),
        percentIRPF: percentCalc(
          calculatedSalary.discountIRPF,
          calculatedSalary.baseINSS
        ),
        percentSalary: percentCalc(
          calculatedSalary.netSalary,
          calculatedSalary.baseINSS
        ),
      });
    }
  };

  render() {
    const {
      salaryCalculated,
      percentINSS,
      percentIRPF,
      percentSalary,
    } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = salaryCalculated;

    return (
      <div className="container">
        <h1>Cálculo de Salário</h1>
        <div className="input-field row">
          <div className="col s4">
            <label htmlFor="inputFullSalary" className="active">
              Salário Bruto
            </label>
            <input
              id="inputFullSalary"
              type="text"
              placeholder="Entre com o Salário bruto"
              onChange={this.handleSalaryChange}
            />
          </div>
          <div className="col s4">
            <label htmlFor="inputDep" className="active">
              Dependentes
            </label>
            <input
              id="inputDep"
              type="number"
              placeholder="Nº Dependentes"
              onChange={this.handleDepChange}
            />
          </div>
        </div>

        <div className={css.readonlyInputsDiv}>
          <div className="input-field row">
            <InputReadOnly
              label="Base INSS:"
              value={toReal(baseINSS)}
              parClass={`${css.readonlyInputs} ${css.baseInss}`}
            />
            <InputReadOnly
              label="Desconto INSS:"
              value={`${toReal(discountINSS)} (${percentINSS}%)`}
              parClass={`${css.readonlyInputs} ${css.discountINSS}`}
            />
            <InputReadOnly
              label="Base IRRF:"
              value={toReal(baseIRPF)}
              parClass={`${css.readonlyInputs} ${css.baseIRPF}`}
            />
            <InputReadOnly
              label="Desconto IRRF:"
              value={`${toReal(discountIRPF)} (${percentIRPF}%)`}
              parClass={`${css.readonlyInputs} ${css.discountIRPF}`}
            />
          </div>
        </div>
        <div className={css.readonlyInputsDiv}>
          <InputReadOnly
            label="Salário Líquido:"
            value={`${toReal(netSalary)} (${percentSalary}%)`}
            parClass={`${css.netSalary}`}
          />
        </div>

        <div className={cssprogress.divBar}>
          <ProgressBarSalary value={percentINSS} color="orange" />
          <ProgressBarSalary value={percentIRPF} color="red" />
          <ProgressBarSalary value={percentSalary} color="green" />
        </div>
        <Footer />
      </div>
    );
  }
}
