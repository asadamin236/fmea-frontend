
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mainProducts, equipmentTypes } from '@/data/mockData';
import { PlusCircle, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiskLevel } from '@/types/fmea-types';

const getBadgeVariant = (riskRating: RiskLevel) => {
  switch (riskRating) {
    case 'low': 
      return 'bg-risk-low';
    case 'medium': 
      return 'bg-risk-medium';
    case 'high': 
      return 'bg-risk-high';
    case 'critical': 
      return 'bg-risk-critical';
    default:
      return 'bg-muted';
  }
};

const ProductList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Equipment Type</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Risk Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mainProducts.map((product) => {
              const equipmentType = equipmentTypes.find(eq => eq.id === product.equipmentTypeId);
              
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{equipmentType?.name || 'Unknown'}</TableCell>
                  <TableCell>{product.componentIds.length}</TableCell>
                  <TableCell>
                    <Badge className={getBadgeVariant(product.riskRating)}>
                      {product.riskRating}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
