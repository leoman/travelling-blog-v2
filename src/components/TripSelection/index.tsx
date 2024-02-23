import React from 'react';
import { Trip } from '../../types/trip'
import {FormWrapper, Label, Select, SelectWrapper, Wrapper } from './index.styled';

interface Props {
  changeTrip: (value: React.ChangeEvent<HTMLSelectElement>) => void
  trips: Trip[]
  slug?: string
}

export const TripSelection = ({ changeTrip, trips, slug: tripSlug }: Props) => (
  <Wrapper>
    <form>
      <div>
        <FormWrapper>
          <Label>Our Trips:</Label>
          <SelectWrapper>
            <Select onChange={changeTrip} name="trips" id="trips" value={tripSlug}>
              <option key={'default'} value={''}>Please select a trip</option>
              {trips.map(({ slug, name }: Trip) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </Select>
            </SelectWrapper>
        </FormWrapper>
      </div>
    </form>
  </Wrapper>
)